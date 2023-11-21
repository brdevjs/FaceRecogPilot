import { useGetInputs } from '@/api/use-get-inputs';
import { useSearchByConcept } from '@/api/use-search-by-concepts';
import FilterConcept from '@/components/filter-concept/filter-concept';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import SideBar from '@/components/sidebar/SideBar';
import { Button, Input } from '@/components/ui';
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import UploadBtn from '@/components/upload-btn/UploadBtn';
import { zodResolver } from "@hookform/resolvers/zod";
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

    const searchConcept = useSearchByConcept();
    // searchConcept?.data?.hits.map((item) => {
    //     console.log(item?.input?.data?.image?.url);
    // });

    const images = useGetInputs();

    if (images.isLoading) {
        return <div>Loading...</div>;
    }
    images?.data?.inputs.map((item: any) => {
        console.log(item?.data?.concepts);
    });


    function onSubmit(values: z.infer<typeof formSchema>) {

    }
    return (
        <>
            <Header />
            <div className='grid grid-cols-4 gap-4'>
                <SideBar />
                <div className='col-span-3 border'>
                    <div className="flex justify-between px-4 py-4">
                        {/* Search Bar */}
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-row'>
                                    <FormField
                                        control={form.control}
                                        name="concept"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="block w-10/12 px-4 py-2 border" placeholder="Search..." {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </>

                        <FilterConcept />
                        <UploadBtn />
                    </div>

                    {/* Content */}
                    <>
                        <div className="mx-auto max-w-2xl px-4 py-12 lg:max-w-7xl my-4">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {images?.data?.inputs.map((image: any) => (
                                    <div key={image.id} className="group">
                                        <div className="h-40 border border-black overflow-hidden">
                                            <img
                                                src={image.data.image.url}
                                                className="object-cover w-full h-full group-hover:opacity-75"
                                            />
                                        </div>
                                        <p className="mt-1 text-lg font-medium text-gray-900">Name: {image.name}</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">Created Date: {image.created_at}</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">Type: {image.type}</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">Size: {image.size}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default HomePage
