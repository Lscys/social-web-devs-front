import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CommentResponse } from '@/service/interface/Comments';
import { Post } from '@/service/interface/Post';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC } from 'react'

interface Props {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    post: Post;
    comments: CommentResponse[];
}

export const PostDetailModal: FC<Props> = ({ isOpen, onClose, post, comments }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-7xl max-w-[90vw] h-[70vh] overflow-y-auto w-ful py-15">
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-center text-xl">Detalle del post</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Imagen del post */}
                    {post.postStats.imageUrl && (
                        <img
                            src={post.postStats.imageUrl}
                            alt="Post"
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    )}

                    {/* Info del post + comentarios */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-1">Publicado por:</h3>
                            <p>{post.user?.name} {post.user?.last_name}</p>
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
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
