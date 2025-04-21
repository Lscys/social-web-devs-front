import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/useAuth';
import { CommentsService } from '@/service/comments/comments.service';
import { CommentResponse } from '@/service/interface/Comments';
import { Post } from '@/service/interface/Post';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, use, useEffect, useState } from 'react'

interface Props {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    post: Post;
    comments: CommentResponse[];
}

export const PostDetailModal: FC<Props> = ({ isOpen, onClose, post, comments }) => {
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState<CommentResponse[]>(comments);
    const { user: currentUser } = useAuth();

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

    useEffect(() => {
        setCommentList(comments);
    }, [comments]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        try {
            await CommentsService.createComment({
                postId: post.idrelease,
                userId: currentUser.iduser,
                content: newComment,
            });

            const updatedComments = await CommentsService.getAllCommentForPostById(post.idrelease);
            setCommentList(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error al enviar comentario desde modal', error);
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
                                {comments.length > 0 ? comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-100 p-2 rounded-lg shadow-sm">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>{comment.user?.name} {comment.user?.last_name}</span>
                                            {comment.createdAt
                                                ? formatDistanceToNow(new Date(comment.createdAt), { locale: es, addSuffix: true })
                                                : "Fecha desconocida"}
                                        </div>
                                        <p className="text-sm text-gray-800">{comment.content}</p>
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
                </div>
            </DialogContent>
        </Dialog>
    );
}
