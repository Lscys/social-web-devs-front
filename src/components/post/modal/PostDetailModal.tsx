import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/useAuth';
import { useAddComment, useComments, useDeleteComment, useUpdateComment } from '@/hooks/useComments';
import { Post } from '@/service/interface/Post';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FC, useState } from 'react'
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteComment } from '@/service/interface/Comments';

interface Props {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    post: Post;
}

export const PostDetailModal: FC<Props> = ({ isOpen, onClose, post }) => {
    const { user: currentUser } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState('');
    const [commentToDelete, setCommentToDelete] = useState<DeleteComment | null>(null);


    const { data: commentList = [], isLoading } = useComments(post.idrelease);
    const addComment = useAddComment(post.idrelease);
    const updateComment = useUpdateComment(post.idrelease);
    const deleteComment = useDeleteComment(post.idrelease);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        try {
            await addComment.mutateAsync({
                postId: post.idrelease,
                userId: currentUser.iduser,
                content: newComment,
            });

            setNewComment('');
        } catch (error) {
            console.error('Error al enviar comentario desde modal', error);
        }
    };

    const handleUpdate = async (commentId: number) => {
        if (!editedContent.trim() || !currentUser) return;

        try {
            await updateComment.mutateAsync({
                userId: currentUser.iduser,
                commentId,
                content: editedContent,
            });

            setEditCommentId(null); // salir del modo edición
            toast.success("Comentario editado con éxito", {
                duration: 4000,
            });
        } catch (error) {
            toast.error("Error al editar comentario");
        }
    };

    const handleDelete = async (comment: DeleteComment) => {
        try {
            await deleteComment.mutateAsync({
                commentId: comment.commentId,
                userId: currentUser?.iduser!,
            });

            toast.success("Se elimino su comentario con exito", {
                duration: 4000,
            });
        } catch (error) {
            toast.error("Error al eliminar comentario");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-7xl max-w-[90vw] h-[70vh] overflow-y-auto w-ful py-15">
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-center text-xl">Detalle del post</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Imagen del post con skeleton */}
                    <div className="relative w-full">
                        {post.postStats.imageUrl ? (
                            <>
                                {isImageLoading && (
                                    <Skeleton className="w-full h-[350px] rounded-lg" />
                                )}
                                <img
                                    src={post.postStats.imageUrl}
                                    alt="Imagen del post"
                                    className={`w-full h-auto rounded-lg object-cover ${isImageLoading ? "hidden" : "block"}`}
                                    onLoad={() => setIsImageLoading(false)}
                                    onError={() => setIsImageLoading(false)}
                                />
                            </>
                        ) : (
                            <div className="w-full h-[350px] flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg border border-dashed border-gray-300 text-sm text-center p-4">
                                🖼️ No hay imagen disponible para este post.
                            </div>
                        )}
                    </div>

                    {/* Info del post + comentarios */}
                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col gap-2 p-4 bg-gray-50 rounded-lg shadow-sm'>
                            <div className='flex items-center gap-2 mb-2'>
                                <img src={post.user.image} alt="imagen de user" className='w-12 h-12 rounded-full object-cover border border-gray-200' />
                                <h6 className="font-semibold text-gray-700 mb-1">{post.user?.name} {post.user?.last_name}</h6>
                            </div>
                            <span>{post.description}</span>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-700 mb-1">Comentarios:</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {commentList.length > 0 ? commentList.map((comment) => (
                                    <div key={comment.id} className="bg-gray-100 p-2 rounded-lg shadow-sm">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>{comment.user?.name} {comment.user?.last_name}</span>
                                            <div className="flex items-center gap-2">
                                                {comment.createdAt
                                                    ? formatDistanceToNow(new Date(comment.createdAt), { locale: es, addSuffix: true })
                                                    : "Fecha desconocida"
                                                }

                                                {comment.user?.iduser === currentUser?.iduser && (
                                                    <Menu as="div" className="relative">
                                                        <MenuButton className="ml-2 text-gray-500 hover:text-gray-700">
                                                            <EllipsisVertical size={16} />
                                                        </MenuButton>
                                                        <MenuItems className="absolute right-0 mt-1 w-28 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                            <div className="py-1 text-sm">
                                                                <MenuItem>
                                                                    {({ focus }) => (
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditCommentId(comment.id);
                                                                                setEditedContent(comment.content);
                                                                            }}
                                                                            className={`w-full text-left px-3 py-1 ${focus ? 'bg-gray-100' : ''}`}
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                    )}
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    {({ focus }) => (
                                                                        <button
                                                                            onClick={() => setCommentToDelete({ commentId: comment.id, userId: currentUser?.iduser! })}
                                                                            className={`w-full text-left px-3 py-1 text-red-600 ${focus ? 'bg-gray-100' : ''}`}
                                                                        >
                                                                            Eliminar
                                                                        </button>
                                                                    )}
                                                                </MenuItem>
                                                            </div>
                                                        </MenuItems>
                                                    </Menu>
                                                )}
                                            </div>
                                        </div>
                                        {editCommentId === comment.id ? (
                                            <div className="space-y-2 mt-1">
                                                <textarea
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    className="w-full border rounded px-2 py-1 text-sm"
                                                    rows={2}
                                                />
                                                <div className="flex gap-2 text-sm">
                                                    <button
                                                        onClick={() => handleUpdate(comment.id)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditCommentId(null)}
                                                        className="text-gray-600 hover:underline"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-800">{comment.content}</p>
                                        )}
                                    </div>
                                )) : (
                                    <p className="text-gray-500 text-sm">Aún no hay comentarios.</p>
                                )}
                            </div>
                            {/* Campo para nuevo comentario */}
                            <div className="mt-4 relative w-full">
                                <input
                                    type="text"
                                    placeholder="Escribe un comentario..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full border border-gray-300 rounded-full px-4 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium hover:underline"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                    {commentToDelete && (
                        <Dialog open={true} onOpenChange={() => setCommentToDelete(null)}>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>¿Eliminar comentario?</DialogTitle>
                                </DialogHeader>
                                <p className="text-sm text-gray-600">
                                    Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar este comentario?
                                </p>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setCommentToDelete(null)}
                                        className="px-4 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(commentToDelete);
                                            setCommentToDelete(null);
                                        }}
                                        className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
