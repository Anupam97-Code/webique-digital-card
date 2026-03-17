
const AboutCardSec = ({ title, description, darkMode, profile }) => {
    return (
        <>
            <div className='d-flex flex-column gap-2'>
                <h4 style={{
                    fontSize: "18px",
                    fontWeight: 600, lineHeight: "27px",
                    color: darkMode ? profile.colors.white : profile.colors.dark,
                }}
                >
                    {title}
                </h4>
                <p
                    style={{
                        fontSize: "12px",
                        lineHeight: "24px",
                        opacity: "0.7",
                        fontWeight: 400,
                        margin: 0,
                        color: darkMode ? profile.colors.white : profile.colors.black,
                    }}
                >
                    {description}
                </p>
            </div>
        </>
    )
}

export default AboutCardSec
