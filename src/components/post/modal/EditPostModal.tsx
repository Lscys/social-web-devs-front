import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Post, PostRequest, Technologies } from "@/service/interface/Post";
import { useAuth } from "@/context/useAuth";
import { TechnologiesService } from "@/service/technologies/technologies.service";
import { FaTimes } from "react-icons/fa";
import { UploadIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdatePost } from "@/hooks/useUpdatePost";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
};


const EditPostModal = ({ isOpen, onClose, post }: Props) => {
    const { user: currentUser } = useAuth();
    const [title, setTitle] = useState(post?.title || "");
    const [description, setDescription] = useState(post?.description);
    const [technologies, setTechnologies] = useState<Technologies[]>([]);
    const [image, setImage] = useState<string | null>(post?.postStats.imageUrl || null);
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>(
        post?.technologies?.map(t => t.idtech) ?? []
      );

    const updatePostMutation = useUpdatePost(() => {
        toast.success("Post actualizado", {
            description: "Los cambios han sido guardados.",
            duration: 4000,
        });
        onClose();
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (post) {
          setTitle(post.title);
          setDescription(post.description);
          setImage(post.postStats.imageUrl || null);
          setSelectedTechnologies(post.technologies?.map(t => t.idtech) || []);
        }
      }, [post]);

    useEffect(() => {
        const fetchTechnologies = async () => {
            const response = await TechnologiesService.getAllTechnologies();
            if (!response) {
                throw new Error('Error fetching technologies');
            }
            setTechnologies(response);
        };

        fetchTechnologies();
    }, []);

    const onUpdatePost = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !selectedTechnologies.length || !currentUser?.iduser) {
            toast.error("Datos incompletos", {
                description: "Por favor completa todos los campos",
                duration: 4000,
            });
            return;
        }

        const data: PostRequest = {
            title,
            description,
            technologiesIds: selectedTechnologies,
            userId: currentUser?.iduser!,
            imageUrl: image ?? "",
        };

        updatePostMutation.mutate({ id: post?.idrelease!, data });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) onClose();
          }}>
            <DialogContent className="sm:max-w-2xl sm:w-full">
                <DialogHeader>
                    <DialogTitle className="text-center">Editando publicación</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" />
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripcion" className="resize-none h-32" />
                        <Select onValueChange={(value) => {
                            const id = Number(value);
                            if (!selectedTechnologies.includes(id)) {
                                setSelectedTechnologies((prev) => [...prev, id]);
                            }
                        }}>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedTechnologies.map((techId) => {
                                    const tech = technologies.find(t => t.idtech === techId);
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
                                {technologies.map((tech) => (
                                    <SelectItem
                                        key={tech.idtech}
                                        value={tech.idtech.toString()}
                                        disabled={selectedTechnologies.includes(tech.idtech)}
                                    >
                                        {tech.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 gap-4 min-h-[300px]">
                        <Button variant="outline" onClick={() => document.getElementById('file-edit-input')?.click()}>
                            Subir imagen
                        </Button>
                        {image ? (
                            <div className="relative w-full h-full">
                                <img src={image} alt="Vista previa" className="mt-4 w-full h-full object-cover rounded-lg" />
                                <button
                                    onClick={() => setImage(null)}
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
                        <input
                            id="file-edit-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button onClick={onUpdatePost} disabled={updatePostMutation.isPending}>
                        {updatePostMutation.isPending ? "Actualizando..." : "Actualizar"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditPostModal;
