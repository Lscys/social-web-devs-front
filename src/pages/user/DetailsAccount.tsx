import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from '../../context/useAuth'
import { AuthService } from '../../service/auth/auth.service';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BriefcaseBusiness, Calendar, Code2, Edit, Github, Globe, Mail, MapPin, MessageSquare, Phone, Save, Shield, Terminal, User, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export default function DetailsAccount() {
    // En una aplicación real, estos datos vendrían de una base de datos
    const [usuario, setUsuario] = useState({
        nombre: "Ana Martínez",
        usuario: "ana_dev",
        email: "ana@ejemplo.com",
        telefono: "+34 612 345 678",
        ubicacion: "Barcelona, España",
        rol: "Frontend Developer",
        bio: "Desarrolladora frontend con 5 años de experiencia en React y TypeScript. Apasionada por la creación de interfaces de usuario intuitivas y accesibles.",
        imagen: "/placeholder.svg?height=128&width=128",
        github: "github.com/ana-dev",
        website: "anamartinez.dev",
        disponibleParaTrabajar: true,
        habilidades: ["JavaScript", "TypeScript", "React", "Next.js", "CSS", "Tailwind", "Node.js", "Git"],
        proyectos: [
            {
                id: 1,
                nombre: "E-commerce Dashboard",
                descripcion: "Panel de administración para tienda online con análisis de datos en tiempo real",
                tecnologias: ["React", "TypeScript", "Chart.js"],
                enlace: "github.com/ana-dev/ecommerce-dashboard",
            },
            {
                id: 2,
                nombre: "Task Manager API",
                descripcion: "API RESTful para gestión de tareas con autenticación JWT",
                tecnologias: ["Node.js", "Express", "MongoDB"],
                enlace: "github.com/ana-dev/task-manager-api",
            },
        ],
        experiencia: [
            {
                empresa: "TechSolutions",
                puesto: "Frontend Developer",
                periodo: "2021 - Presente",
                descripcion: "Desarrollo de aplicaciones web con React y TypeScript",
            },
            {
                empresa: "WebStudio",
                puesto: "Junior Developer",
                periodo: "2019 - 2021",
                descripcion: "Mantenimiento y desarrollo de sitios web con JavaScript y CSS",
            },
        ],
    })

    // Datos del usuario que pueden venir del contexto o backend
    /* const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true); */


    /* const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                reader.result as string; // Guardamos la imagen en el estado
            };
            reader.readAsDataURL(file); // Leemos el archivo como una URL base64
        }
    };

    const handleSave = () => {
        // lógica para guardar cambios
        console.log({ name, lastName, username, phone });
    };

    const handlePasswordChange = () => {
        // lógica para cambiar la contraseña
        console.log("Cambiar password:", password);
    }; */

    const [editando, setEditando] = useState({
        informacionPersonal: false,
        habilidades: false,
        proyecto: null,
        experiencia: null,
    })

    const [nuevaHabilidad, setNuevaHabilidad] = useState("")
    const [nuevoProyecto, setNuevoProyecto] = useState({
        nombre: "",
        descripcion: "",
        tecnologias: "",
        enlace: "",
    })
    const [nuevaExperiencia, setNuevaExperiencia] = useState({
        empresa: "",
        puesto: "",
        periodo: "",
        descripcion: "",
    })

    // Manejadores para edición de información personal
    const handleGuardarInfoPersonal = () => {
        // Aquí iría la lógica para guardar en la base de datos
        setEditando({ ...editando, informacionPersonal: false })
    }

    // Manejadores para habilidades
    const handleAgregarHabilidad = () => {
        if (nuevaHabilidad.trim()) {
            setUsuario({
                ...usuario,
                habilidades: [...usuario.habilidades, nuevaHabilidad.trim()],
            })
            setNuevaHabilidad("")
        }
    }

    const handleEliminarHabilidad = (index: number) => {
        const nuevasHabilidades = [...usuario.habilidades]
        nuevasHabilidades.splice(index, 1)
        setUsuario({ ...usuario, habilidades: nuevasHabilidades })
    }

    // Manejadores para proyectos
    const handleAgregarProyecto = () => {
        if (nuevoProyecto.nombre.trim() && nuevoProyecto.descripcion.trim()) {
            setUsuario({
                ...usuario,
                proyectos: [
                    ...usuario.proyectos,
                    {
                        id: Date.now(),
                        nombre: nuevoProyecto.nombre,
                        descripcion: nuevoProyecto.descripcion,
                        tecnologias: nuevoProyecto.tecnologias.split(",").map((t) => t.trim()),
                        enlace: nuevoProyecto.enlace,
                    },
                ],
            })
            setNuevoProyecto({ nombre: "", descripcion: "", tecnologias: "", enlace: "" })
        }
    }

    const handleEliminarProyecto = (id: number) => {
        setUsuario({
            ...usuario,
            proyectos: usuario.proyectos.filter((p) => p.id !== id),
        })
    }

    // Manejadores para experiencia
    const handleAgregarExperiencia = () => {
        if (nuevaExperiencia.empresa.trim() && nuevaExperiencia.puesto.trim()) {
            setUsuario({
                ...usuario,
                experiencia: [...usuario.experiencia, { ...nuevaExperiencia }],
            })
            setNuevaExperiencia({ empresa: "", puesto: "", periodo: "", descripcion: "" })
        }
    }

    const handleEliminarExperiencia = (index: number) => {
        const nuevaExperiencia = [...usuario.experiencia]
        nuevaExperiencia.splice(index, 1)
        setUsuario({ ...usuario, experiencia: nuevaExperiencia })
    }

    return (
        <div className="container mx-auto py-6 space-y-6 max-w-7xl">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/social">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Mi Perfil</h1>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Información principal del usuario */}
                <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle>Perfil</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditando({ ...editando, informacionPersonal: !editando.informacionPersonal })}
                            >
                                {editando.informacionPersonal ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                            </Button>
                        </div>
                        <CardDescription>Tu información personal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center space-y-3">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={usuario.imagen || "/placeholder.svg"} alt={usuario.nombre} />
                                <AvatarFallback>
                                    {usuario.nombre
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            {editando.informacionPersonal ? (
                                <div className="text-center w-full">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        value={usuario.nombre}
                                        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                                        className="mb-2"
                                    />
                                    <Label htmlFor="usuario">Usuario</Label>
                                    <Input
                                        id="usuario"
                                        value={usuario.usuario}
                                        onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
                                        className="mb-2"
                                    />
                                    <Label htmlFor="rol">Rol</Label>
                                    <Input
                                        id="rol"
                                        value={usuario.rol}
                                        onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h2 className="text-xl font-bold">{usuario.nombre}</h2>
                                    <p className="text-muted-foreground">@{usuario.usuario}</p>
                                    <Badge className="mt-2">{usuario.rol}</Badge>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {editando.informacionPersonal ? (
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={usuario.email}
                                        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input
                                        id="telefono"
                                        value={usuario.telefono}
                                        onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="ubicacion">Ubicación</Label>
                                    <Input
                                        id="ubicacion"
                                        value={usuario.ubicacion}
                                        onChange={(e) => setUsuario({ ...usuario, ubicacion: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="github">GitHub</Label>
                                    <Input
                                        id="github"
                                        value={usuario.github}
                                        onChange={(e) => setUsuario({ ...usuario, github: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="website">Sitio web</Label>
                                    <Input
                                        id="website"
                                        value={usuario.website}
                                        onChange={(e) => setUsuario({ ...usuario, website: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="bio">Biografía</Label>
                                    <Textarea
                                        id="bio"
                                        value={usuario.bio}
                                        onChange={(e) => setUsuario({ ...usuario, bio: e.target.value })}
                                        rows={4}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Switch
                                        id="disponible"
                                        checked={usuario.disponibleParaTrabajar}
                                        onCheckedChange={(checked) => setUsuario({ ...usuario, disponibleParaTrabajar: checked })}
                                    />
                                    <Label htmlFor="disponible">Disponible para trabajar</Label>
                                </div>
                                <Button onClick={handleGuardarInfoPersonal} className="w-full">
                                    <Save className="h-4 w-4 mr-2" /> Guardar cambios
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{usuario.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{usuario.telefono}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{usuario.ubicacion}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Github className="h-4 w-4 text-muted-foreground" />
                                        <span>{usuario.github}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span>{usuario.website}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-medium mb-2">Sobre mí</h3>
                                    <p className="text-sm text-muted-foreground">{usuario.bio}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${usuario.disponibleParaTrabajar ? "bg-green-500" : "bg-red-500"}`}
                                    ></div>
                                    <span className="text-sm">
                                        {usuario.disponibleParaTrabajar ? "Disponible para trabajar" : "No disponible para trabajar"}
                                    </span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Contenido principal */}
                <div className="md:col-span-2 space-y-6">
                    {/* Tabs para información detallada */}
                    <Tabs defaultValue="habilidades">
                        <TabsList className="w-full grid grid-cols-4 mb-6">
                            <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
                            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
                            <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
                            <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
                        </TabsList>

                        <TabsContent value="habilidades" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Mis Habilidades</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditando({ ...editando, habilidades: !editando.habilidades })}
                                        >
                                            {editando.habilidades ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <CardDescription>Tecnologías y herramientas que dominas</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {usuario.habilidades.map((habilidad, index) => (
                                                <Badge key={index} fontVariant="secondary" className="text-sm py-1 px-3">
                                                    {habilidad}
                                                    {editando.habilidades && (
                                                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleEliminarHabilidad(index)} />
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>

                                        {editando.habilidades && (
                                            <div className="flex gap-2 mt-4">
                                                <Input
                                                    placeholder="Nueva habilidad"
                                                    value={nuevaHabilidad}
                                                    onChange={(e) => setNuevaHabilidad(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Button onClick={handleAgregarHabilidad}>Agregar</Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="proyectos" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mis Proyectos</CardTitle>
                                    <CardDescription>Proyectos en los que has trabajado</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {usuario.proyectos.map((proyecto) => (
                                            <div key={proyecto.id} className="p-4 border rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-lg">{proyecto.nombre}</h3>
                                                        <p className="text-sm text-muted-foreground mt-1">{proyecto.descripcion}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEliminarProyecto(proyecto.id)}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {proyecto.tecnologias.map((tech, idx) => (
                                                        <Badge key={idx} fontVariant="outline" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="mt-3 flex items-center gap-2 text-sm">
                                                    <Code2 className="h-4 w-4 text-muted-foreground" />
                                                    <a
                                                        href={`https://${proyecto.enlace}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {proyecto.enlace}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-4 border rounded-lg border-dashed">
                                            <h3 className="font-medium mb-3">Agregar nuevo proyecto</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label htmlFor="nombre-proyecto">Nombre del proyecto</Label>
                                                    <Input
                                                        id="nombre-proyecto"
                                                        value={nuevoProyecto.nombre}
                                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="descripcion-proyecto">Descripción</Label>
                                                    <Textarea
                                                        id="descripcion-proyecto"
                                                        value={nuevoProyecto.descripcion}
                                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
                                                        rows={2}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="tecnologias-proyecto">Tecnologías (separadas por comas)</Label>
                                                    <Input
                                                        id="tecnologias-proyecto"
                                                        value={nuevoProyecto.tecnologias}
                                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, tecnologias: e.target.value })}
                                                        placeholder="React, TypeScript, Node.js"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="enlace-proyecto">Enlace</Label>
                                                    <Input
                                                        id="enlace-proyecto"
                                                        value={nuevoProyecto.enlace}
                                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, enlace: e.target.value })}
                                                        placeholder="github.com/usuario/proyecto"
                                                    />
                                                </div>
                                                <Button onClick={handleAgregarProyecto} className="w-full">
                                                    Agregar proyecto
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="experiencia" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mi Experiencia</CardTitle>
                                    <CardDescription>Experiencia laboral y profesional</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {usuario.experiencia.map((exp, index) => (
                                            <div key={index} className="p-4 border rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <BriefcaseBusiness className="h-5 w-5 text-primary" />
                                                            <h3 className="font-medium text-lg">{exp.empresa}</h3>
                                                        </div>
                                                        <p className="text-sm font-medium mt-1">{exp.puesto}</p>
                                                        <p className="text-xs text-muted-foreground">{exp.periodo}</p>
                                                        <p className="text-sm mt-2">{exp.descripcion}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEliminarExperiencia(index)}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-4 border rounded-lg border-dashed">
                                            <h3 className="font-medium mb-3">Agregar nueva experiencia</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label htmlFor="empresa">Empresa</Label>
                                                    <Input
                                                        id="empresa"
                                                        value={nuevaExperiencia.empresa}
                                                        onChange={(e) => setNuevaExperiencia({ ...nuevaExperiencia, empresa: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="puesto">Puesto</Label>
                                                    <Input
                                                        id="puesto"
                                                        value={nuevaExperiencia.puesto}
                                                        onChange={(e) => setNuevaExperiencia({ ...nuevaExperiencia, puesto: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="periodo">Periodo</Label>
                                                    <Input
                                                        id="periodo"
                                                        value={nuevaExperiencia.periodo}
                                                        onChange={(e) => setNuevaExperiencia({ ...nuevaExperiencia, periodo: e.target.value })}
                                                        placeholder="2021 - Presente"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="descripcion-exp">Descripción</Label>
                                                    <Textarea
                                                        id="descripcion-exp"
                                                        value={nuevaExperiencia.descripcion}
                                                        onChange={(e) => setNuevaExperiencia({ ...nuevaExperiencia, descripcion: e.target.value })}
                                                        rows={2}
                                                    />
                                                </div>
                                                <Button onClick={handleAgregarExperiencia} className="w-full">
                                                    Agregar experiencia
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="publicaciones" className="space-y-4">
                            <Label className="text-sm font-medium">Mis Publicaciones</Label>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
