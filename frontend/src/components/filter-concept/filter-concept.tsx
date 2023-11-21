import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { useGetListConcept } from '@/api/use-get-list-concepts'

const FilterConcept = () => {
    const listConcept = useGetListConcept();

    if (listConcept.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        {listConcept?.data?.concepts.map((concept: any) => {
                            return (
                                <SelectItem key={concept.id} value={concept.name}>{concept.name}</SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterConcept;