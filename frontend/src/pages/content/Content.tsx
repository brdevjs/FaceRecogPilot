import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const products: any[] = [
    {
        id: 1,
        imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
        imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
        name: "Earthen Bottle",
        price: "$48",
    },
    {
        id: 2,
        imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
        imageAlt: "Olive drab green insulated bottle with flared screw lid and flat top.",
        name: "Nomad Tumbler",
        price: "$35",
    },
    {
        id: 3,
        imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
        imageAlt: "Person using a pen to cross a task off a productivity paper card.",
        name: "Focus Paper Refill",
        price: "$89",
    },
    {
        id: 4,
        imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
        imageAlt: "Hand holding black machined steel mechanical pencil with brass tip and top.",
        name: "Machined Mechanical Pencil",
        price: "$35",
    },
]

const Content = () => {
    return (
        <>
            <div className="mx-auto max-w-2xl px-4 py-12 lg:max-w-7xl my-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Content
