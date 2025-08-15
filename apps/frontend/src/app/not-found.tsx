import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="pt-32 px-4 pb-8 md:px-8">
            <h2 className="text-primary flex flex-col justify-center items-center">
                <span className="font-light text-8xl md:text-[144px] tracking-widest">404</span>
                <span className="text-2xl md:text-3xl lg:text-5xl mt-4">Oops! Page Not Found...</span>
            </h2>
            <p className="text-lg md:text-xl tracking-wider text-primary mt-32">
                Well… this is awkward.
                <br />
                We can’t seem to find what you’re looking for.
            </p>
            <div className="mt-5 text-lg md:text-xl">
                <h3 className="text-primary font-semibold mt-6">It might be because:</h3>
                <ol className="list-decimal pl-5 mt-2">
                    <li className="text-primary font-light tracking-wide">The link is old or broken.</li>
                    <li className="text-primary font-light tracking-wide">The page has been deleted.</li>
                    <li className="text-primary font-light tracking-wide">There’s a tiny typo hiding in the URL.</li>
                </ol>
            </div>
            <div className="mt-10 text-lg md:text-xl">
                <h3 className="text-primary font-semibold mt-6">What now?</h3>
                <ol className="list-disc pl-5 mt-2">
                    <li className="text-primary font-light tracking-wide">
                        Double-check the link and give it another shot.
                    </li>
                    <li className="text-primary font-light tracking-wide">Let us know so we can fix it.</li>
                    <li className="text-primary font-light tracking-wide">
                        Or just{' '}
                        <Link
                            href="/"
                            className="text-secondary hover:text-secondary-hover transition-colors duration-300 ease-in-out"
                        >
                            head back home
                        </Link>{' '}
                        — it’s much nicer there.
                    </li>
                </ol>
            </div>
        </div>
    )
}
