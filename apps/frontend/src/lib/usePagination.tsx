import { usePathname, useSearchParams } from 'next/navigation'

function usePagination() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
    }

    const updateUrlWithoutNavigation = (page: number) => {
        const newUrl = `${pathname}?${createQueryString('p', page.toString())}`
        window.history.pushState({ page }, '', newUrl)
    }

    return updateUrlWithoutNavigation
}

export default usePagination
