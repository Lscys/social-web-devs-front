import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-black rounded-2xl text-white min-h-[90%] flex-shrink-0 p-6 mt-2.5 mb-2.5 flex flex-col gap-6">
            <div className="text-xl font-bold mb-6">DEVS</div>
            <nav className="space-y-4">
                <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                    <FaUserCircle />
                    <span>Inicio</span>
                </div>
                <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                    <FaSearch />
                    <span>Buscar</span>
                </div>
                <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                    <MdOutlinePostAdd />
                    <span>Crear</span>
                </div>
            </nav>
        </aside>
    );
}
