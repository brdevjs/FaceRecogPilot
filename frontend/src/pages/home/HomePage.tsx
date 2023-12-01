/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetInputs } from '@/api/use-get-inputs';
import { useSearchByConcept } from '@/api/use-search-by-concepts';
import { Navbar } from '@/components/navbar/Navbar';
import SideBar from '@/components/sidebar/SideBar';
import { Button, Dialog, DialogContent, DialogTrigger, Input } from '@/components/ui';
import { Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadImages } from '@/components/upload-image/upload-image';
import { cn } from '@/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    concept: z.string().min(2, {
        message: "Concept must be at least 2 characters.",
    }),
})

const HomePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concept: "",
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchConcept = useSearchByConcept();
    // searchConcept?.data?.hits.map((item) => {
    //     console.log(item?.input?.data?.image?.url);
    // });

    const images = useGetInputs();

    if (images.isLoading) {
        return <div>Loading...</div>;
    }

    function onSubmit() { }

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
                <SideBar />
            </div>
            <main className="md:pl-72 pb-10">
                <Navbar />
                {/* Heading */}
                <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
                    <div className={cn("p-2 w-fit rounded-md")}>
                        {/* <Icon className={cn("w-10 h-10", iconColor)} /> */}
                        <CameraIcon className={cn("w-10 h-10")} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">List Images</h2>
                    </div>
                </div>

                <div>
                    <div className="px-4 lg:px-8 flex">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='lg:w-3/5 flex flex-row'>
                                <FormField
                                    control={form.control}
                                    name="concept"
                                    render={({ field }) => (
                                        <FormItem className='lg:w-4/5 mr-1'>
                                            <FormControl>
                                                <Input placeholder="Search..." {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>

                        </Form>
                        {/* Select type */}
                        <div className='lg:mr-36'>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="Name">Name</SelectItem>
                                        <SelectItem value="Concept">Concept</SelectItem>
                                        <SelectItem value="Date">Date</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Upload Btn */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Upload</Button>
                            </DialogTrigger>
                            <DialogContent >
                                <UploadImages />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Content */}
                    <div className='px-4 lg:px-8'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                            {images?.data?.inputs.map((image: any) =>
                            (
                                <Card key={image.id} className="rounded-lg overflow-hidden">
                                    <div className="relative aspect-square">
                                        <img
                                            src={image.data.image.url}
                                            className="object-cover w-full h-full group-hover:opacity-75"
                                        />
                                    </div>
                                </Card>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}

export default HomePage
