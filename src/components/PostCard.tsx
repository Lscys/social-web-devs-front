import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar } from "react-icons/fa";
import { Post } from "../service/interface/Post";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"

export default function PostCard({
    id,
    title,
    description,
    technologies,
    user,
    postStats,
    comments,
    likes,
    createdAt,
}: Post) {
    const imageUrl = postStats?.imageUrl?.trim() || "";

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

            {/* Imagen del post si existe */}
            {imageUrl && (
                <div className="rounded-lg overflow-hidden mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}

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
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
                    <FaThumbsUp className="text-sm" />
                    <span className="text-sm">{likes.length}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
                    <FaCommentDots className="text-sm" />
                    <span className="text-sm">{comments.length}</span>
                </button>

                <button
                    className={`flex items-center gap-2 transition ${postStats.starred
                            ? "text-yellow-400"
                            : "text-gray-500 hover:text-yellow-400"
                        }`}
                >
                    <FaStar className="text-sm" />
                </button>

                <input
                    type="text"
                    placeholder="Comentar algo..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-1.5 text-sm ml-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
        </div>
    );
}
