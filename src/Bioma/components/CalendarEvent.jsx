

export const CalendarEvent = ({ event }) => {

    const { area, usuario, price } = event;

    return (
        <>
            <strong>{ area }</strong>
            <br />
            <strong>{ usuario }</strong>
            <br />
            <strong>{ price }</strong>
            {/* <span> - { user.name }</span> */}
        </>
    )
}
