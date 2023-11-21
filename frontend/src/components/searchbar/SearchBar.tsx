import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
    concept: z.string().min(2, {
        message: "Concept must be at least 2 characters.",
    }),
})

const SearchBar = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concept: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    // const searchConcept = useSearchByConcept();
    return (
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
    )
}

export default SearchBar
