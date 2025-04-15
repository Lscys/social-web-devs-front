import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar } from "react-icons/fa";
import { Post } from "../service/interface/Post";

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
  console.log("Post Stats:", postStats);
  const imageUrl = postStats?.imageUrl?.trim() || "";
  return (
    <div className="bg-white rounded-xl p-4 shadow mb-4">
      {/* Header usuario */}
      <div className="flex items-center gap-3 mb-2">
        <FaUserCircle className="text-3xl text-gray-500" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{user.name} {user.last_name}</p>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
        </div>
      </div>

      {/* Título y descripción */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Imagen del post si existe */}
      {/* {imageUrl && (
        <div className="bg-gray-200 h-48 rounded-md mb-4 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )} */}
       {/* Imagen del post si existe */}
       {imageUrl && imageUrl !== "" && (
        <div className="bg-gray-200 h-48 rounded-md mb-4 overflow-hidden">
          <img src={imageUrl.toString()} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Tecnologías */}
      {technologies.length > 0 && (
        <div className="mb-3">
          <p className="font-semibold mb-1">Tecnologías</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech.idtech} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center gap-4 mt-4">
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
          <FaThumbsUp /> <span>{likes.length}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
          <FaCommentDots /> <span>{comments.length}</span>
        </button>
        <button className={`flex items-center gap-1 ${postStats.starred ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}>
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