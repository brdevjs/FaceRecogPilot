import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <div className="flex w-full justify-end">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}