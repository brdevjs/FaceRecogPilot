import { useGetInputs } from '@/api/use-get-inputs';


const Content = () => {
    const images = useGetInputs();

    if (images.isLoading) {
        return <div>Loading...</div>;
    }

    return (
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
    )
}

export default Content
