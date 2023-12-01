import { getImages } from '@/apis/images.api';
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
import { UploadBtn } from '@/components/upload-btn/UploadBtn';
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { TSFixMe } from '@/types';

const formSchema = z.object({
    concept: z.string().min(2, {
        message: "Concept must be at least 2 characters.",
    }),
})
type FormSchema = z.infer<typeof formSchema>;

type SearchType = 'name' | 'type' | 'size'

function HomePage() {
    const [searchType, setSearchType] = useState<SearchType>('name');
    const [searchParam, setSearchParam] = useState('');
    console.log(searchParam);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concept: "",
        },
    });

    function onSubmit(data: FormSchema) {
        if (searchType === 'name') setSearchParam(`name=${data.concept}`)
        if (searchType === 'type') setSearchParam(`type=${data.concept}`)
        if (searchType === 'size') setSearchParam(`size=${data.concept}`)
        refetch()
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['images', searchParam],
        queryFn: () => getImages(searchParam),
    })

    return (
        <>
            <Header />
            <div className='grid grid-cols-4 gap-4'>
                <SideBar />
                <div className='col-span-3 border'>
                    <div className="flex justify-between px-4 py-4">
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

                        <Select onValueChange={(value: SearchType) => setSearchType(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Search by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="type">Type</SelectItem>
                                    <SelectItem value="size">Size</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <>
                        <div className="mx-auto max-w-2xl px-4 py-12 lg:max-w-7xl my-4">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {isLoading
                                    ?
                                    <div>
                                        Data is Loading.....
                                    </div>
                                    :
                                    <>
                                        {data?.data.map((item: TSFixMe) => {
                                            return (
                                                <div key={item._id}>
                                                    <div>{item?.name || item?.filename}</div>
                                                    <div>{item?.size}</div>
                                                    <div>{item?.type}</div>
                                                </div>
                                            )
                                        })}
                                    </>
                                }
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
