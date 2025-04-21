import { FaSearch } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

type Props = {
    onCreate: () => void;
};

export default function CreatePostBar({ onCreate }: Props) {
    return (
        <div className="flex justify-between mb-4">
            <div className="relative w-2/3">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border border-gray-300 rounded-md py-2 px-4"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
                onClick={onCreate}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                <MdOutlinePostAdd className="text-xl" />
                Crear post
            </button>
        </div>
    );
}
