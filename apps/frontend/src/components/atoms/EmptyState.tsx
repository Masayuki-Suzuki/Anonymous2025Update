type EmptyStateProps = {
    message?: string
}

/**
 * EmptyState component - displays a message when no data is available
 * Used by list content components to show a standardized empty state
 */
const EmptyState = ({ message = 'No data found' }: EmptyStateProps) => {
    return <p className="text-center py-4">{message}</p>
}

export default EmptyState
