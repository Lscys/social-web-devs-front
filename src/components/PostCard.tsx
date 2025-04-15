import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar } from "react-icons/fa";

interface PostCardProps {
  id: string;
  authorName: string;
  authorRole: string;
  title: string;
  description: string;
  technologies: string[];
  likes: number;
  comments: number;
  isStarred: boolean;
  imageUrl?: string;
  createdAt: string;
}

export default function PostCard({
  id,
  authorName,
  authorRole,
  title,
  description,
  technologies,
  likes,
  comments,
  isStarred,
  imageUrl,
  createdAt,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4">
      {/* Header usuario */}
      <div className="flex items-center gap-3 mb-2">
        <FaUserCircle className="text-3xl text-gray-500" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{authorName}</p>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
          <p className="text-sm text-gray-500">{authorRole}</p>
        </div>
      </div>

      {/* Título y descripción */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Imagen o recurso */}
      {imageUrl && (
        <div className="bg-gray-200 h-48 rounded-md mb-4 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Tecnologías */}
      {technologies.length > 0 && (
        <div className="mb-3">
          <p className="font-semibold mb-1">Tecnologías</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center gap-4 mt-4">
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
          <FaThumbsUp /> <span>{likes}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
          <FaCommentDots /> <span>{comments}</span>
        </button>
        <button className={`flex items-center gap-1 ${isStarred ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}>
          <FaStar />
        </button>
        <input
          type="text"
          placeholder="Comentar algo..."
          className="flex-1 border rounded-md px-3 py-1 ml-4 text-sm"
        />
      </div>
    </div>
  );
}