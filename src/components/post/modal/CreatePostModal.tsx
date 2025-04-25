import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/useAuth';
import { useCreatePost } from '@/hooks/useCreatePost';
import { uploadImageToCloudinary } from '@/service/api/uploadImage';
import { PostRequest, Technologies } from '@/service/interface/Post';
import { PostService } from '@/service/post/post.service';
import { TechnologiesService } from '@/service/technologies/technologies.service';
import { UploadIcon } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

interface CreatePostModalProps {
    open: boolean;
    onClose: () => void;
}


const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState<Technologies[]>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setSelectedTechnologies([]);
        setImagePreview(null);
        setImageFile(null);
    };

    // 🚀 Mutation de publicación
    const createPostMutation = useCreatePost(() => {
        toast.success("Se publicó tu post", {
            description: "Post publicado con éxito",
            duration: 4000,
        });
        resetForm();
        onClose(); // Cierra el modal
    });

    // Función para manejar la carga de la imagen
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // Guardamos la imagen en el estado
            };
            reader.readAsDataURL(file); // Leemos el archivo como una URL base64
            setImageFile(file)
        }
    };

    useEffect(() => {
        const fetchTechnologies = async () => {
            const response = await TechnologiesService.getAllTechnologies();
            if (!response) {
                throw new Error('Error fetching technologies');
            }
            setTechnologies(response);
        };

        fetchTechnologies();
    }, [])

    const onPushPost = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !selectedTechnologies.length || !user?.iduser) {
            toast.error("Datos incompletos", {
                description: "Por favor completa todos los campos",
                duration: 4000,
            });
            return;
        }

        let imageUrl = "";

        if (imageFile) {
            try {
                setIsUploading(true);
                imageUrl = await uploadImageToCloudinary(imageFile);
            } catch (error) {
                toast.error("Error subiendo imagen");
                setIsUploading(false);
                return;
            }
        }


        const data: PostRequest = {
            title,
            description,
            technologiesIds: selectedTechnologies,
            userId: user.iduser,
            imageUrl
        };

        createPostMutation.mutate(data, {
            onSuccess: () => {
                setIsUploading(false); // Cuando se publique correctamente, dejamos de mostrar el estado de carga
            },
            onError: () => {
                setIsUploading(false); // En caso de error, dejamos de mostrar el estado de carga
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl sm:w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">Creando nueva publicacion</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Titulo"
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={createPostMutation.isPending}
                        />
                        <Textarea placeholder="Descripcion" className="resize-none h-32"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Select onValueChange={(value) => {
                            const id = Number(value);
                            if (!selectedTechnologies.includes(id)) {
                                setSelectedTechnologies((prev) => [...prev, id]);
                            }
                        }}
                            disabled={createPostMutation.isPending}
                        >
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedTechnologies.map((techId) => {
                                    const tech = technologies?.find(t => t.idtech === techId);
                                    if (!tech) return null;
                                    return (
                                        <div
                                            key={techId}
                                            className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-800 shadow-sm hover:shadow-md transition duration-200"
                                        >
                                            {tech.name}
                                            <button
                                                onClick={() =>
                                                    setSelectedTechnologies((prev) => prev.filter((id) => id !== techId))
                                                }
                                                className="ml-1 text-gray-500 hover:text-red-500 transition"
                                            >
                                                <FaTimes size={12} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <SelectTrigger>
                                <SelectValue placeholder="Tecnologías" />
                            </SelectTrigger>
                            <SelectContent>
                                {technologies?.map((tech) => (
                                    <SelectItem
                                        key={tech.idtech}
                                        value={tech.idtech.toString()}
                                        disabled={selectedTechnologies.includes(tech.idtech)} // Deshabilita si ya está seleccionada
                                    >
                                        {tech.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 gap-4 min-h-[300px]">
                        <Button
                            variant="outline"
                            onClick={() => document.getElementById('file-input')?.click()}
                            disabled={createPostMutation.isPending}
                        >
                            Subir imagen
                        </Button>

                        {/* Si ya hay imagen, mostrarla */}
                        {imagePreview ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={imagePreview}
                                    alt="Vista previa"
                                    className="mt-4 w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                    }}
                                    className="absolute top-2 right-0.5 bg-black text-white px-2 py-1 text-xs rounded-2xl hover:bg-white hover:text-black transition duration-200"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-500">
                                <UploadIcon size={40} />
                                <span>Selecciona una imagen</span>
                            </div>
                        )}

                        {/* Input de tipo file oculto */}
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={onPushPost}
                        disabled={isUploading}
                    >
                        {isUploading ? "Publicando..." : "Publicar"}
                    </Button>
                </div>
                {isUploading && (
                    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
                        <div className="text-center flex flex-col items-center gap-2 z-50">
                            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                            <p className="text-sm text-gray-700">Publicando tu post...</p>
                        </div>
                    </div>
                )}

            </DialogContent>
        </Dialog>


    );
}

export default CreatePostModal;
