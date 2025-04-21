import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar } from "react-icons/fa";
import { Post } from "../../service/interface/Post";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"
import { LikeButton } from "../LikeButton";
import { useAuth } from "@/context/useAuth";
import { useEffect, useState } from "react";
import { CommentsService } from "@/service/comments/comments.service";
import { CommentResponse } from "@/service/interface/Comments";
import { PostDetailModal } from "./modal/PostDetailModal";
import { Skeleton } from "../ui/skeleton";
import { useAddComment, useComments } from "@/hooks/useComments";

type Props = {
    post: Post;
};


export default function PostCard({ post }: Props) {

    const {
        idrelease,
        title,
        description,
        technologies,
        user,
        postStats,
        comments,
        likes,
        createdAt
    } = post;

    const { user: currentUser } = useAuth();
    const imageUrl = postStats?.imageUrl?.trim() || "";
    const [newComment, setNewComment] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const { data: allComments = [], isLoading: isLoadingComments } = useComments(idrelease);
    const addComment = useAddComment(idrelease);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !currentUser) return;

        try {
            await addComment.mutateAsync({
                postId: idrelease,
                userId: currentUser.iduser,
                content: newComment,
            });

            setNewComment("");
        } catch (error) {
            console.error("Error al enviar comentario", error);
        }
    };

    /* const loadComments = async () => {
        try {
            if (user?.iduser) {
                const response = await CommentsService.getAllCommentForPostById(idrelease);
                console.log("Comentarios cargados:", response);
                setAllComments(response);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
        }
    }; */

    /* useEffect(() => {
        setAllComments(comments as CommentResponse[]);
    }, [comments]); */



    return (
        <div className="bg-white rounded-xl p-6 shadow-md mb-6 mr-4">
            {/* Header usuario */}
            <div className="flex items-center gap-4 mb-4">
                {user.image ? (
                    <img
                        src={user.image}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                )}
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">
                            {user.name} {user.last_name}
                        </p>
                        <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Título y descripción */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>


            {/* Imagen del post si existe o placeholder */}
            <div
                className="rounded-lg overflow-hidden mb-4 cursor-pointer"
                onClick={() => setShowDetails(true)}
            >
                {imageUrl ? (
                    <>
                        {isImageLoading && (
                            <Skeleton className="w-full h-96 rounded-lg bg-gray-200 animate-pulse" />
                        )}
                        <img
                            src={imageUrl}
                            alt={title}
                            className={`w-full h-96 object-cover transition-transform duration-300 hover:scale-105 ${isImageLoading ? "hidden" : "block"}`}
                            onLoad={() => setIsImageLoading(false)}
                            onError={() => setIsImageLoading(false)}
                        />
                    </>
                ) : (
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded-lg border border-dashed">
                        No hay imagen disponible
                    </div>
                )}
            </div>

            {/* Tecnologías */}
            {technologies.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tecnologías</p>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <span
                                key={tech.idtech}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-5 border-t pt-4 mt-4">
                <LikeButton postId={idrelease} postLike={postStats} currentUserId={currentUser?.iduser!}></LikeButton>

                <button
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
                    onClick={() => setShowDetails(true)}
                >
                    <FaCommentDots className="text-sm" />
                    {isLoadingComments ? (
                        <p className="text-sm text-gray-400">Cargando comentarios...</p>
                    ) : (
                        <span className="text-sm">{allComments.length}</span>
                    )}
                </button>

                <button
                    className={`flex items-center gap-2 transition ${postStats.starred
                        ? "text-yellow-400"
                        : "text-gray-500 hover:text-yellow-400"
                        }`}
                >
                    <FaStar className="text-sm" />
                </button>

                {/* Nuevo comentario */}
                <div className="relative w-full mt-2">
                    <input
                        type="text"
                        placeholder="Comentar algo..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-full px-4 pr-20 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium hover:underline"
                    >
                        Enviar
                    </button>
                    
                </div>
            </div>
            <PostDetailModal
                isOpen={showDetails}
                onClose={setShowDetails}
                post={post}
            />
        </div>
    );
}
