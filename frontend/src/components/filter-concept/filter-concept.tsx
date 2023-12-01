import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '../ui/select';

const FilterConcept = () => {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        {/* {listConcept?.data?.concepts.map((concept: any) => {
                            return (
                                <SelectItem key={concept.id} value={concept.name}>{concept.name}</SelectItem>
                            )
                        })} */}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterConcept;