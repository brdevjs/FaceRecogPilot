import { cn } from "@/utils"
import { CameraIcon } from "lucide-react";

const routes = [
    {
        label: 'List Image',
        icon: <CameraIcon />,
        href: '/list-images',
        color: "text-sky-500"
    },
    {
        label: 'Conversation',
        icon: '',
        href: '/conversation',
        color: "text-violet-500",
    },
    {
        label: 'Image Generation',
        icon: '',
        color: "text-pink-700",
        href: '/image',
    },
    {
        label: 'Video Generation',
        icon: '',
        color: "text-orange-700",
        href: '/video',
    },
    {
        label: 'Music Generation',
        icon: '',
        color: "text-emerald-500",
        href: '/music',
    },
    {
        label: 'Code Generation',
        icon: '',
        color: "text-green-700",
        href: '/code',
    },
    {
        label: 'Settings',
        icon: '',
        href: '/settings',
    },
];

const SideBar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <a href="" className="flex items-center pl-3 mb-14">
                    <div className="relative h-8 w-8 mr-4">
                        <img alt="Logo" src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" />
                    </div>
                    <h1 className={cn("text-2xl font-bold")}>
                        Face Pilot App
                    </h1>
                </a>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <a
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                // pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                {/* <route.icon className={cn("h-5 w-5 mr-3", route.color)} /> */}
                                <div className={cn("h-5 w-5 mr-3")}>
                                    {route.icon}
                                </div>
                                <div>
                                    {route.label}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideBar
