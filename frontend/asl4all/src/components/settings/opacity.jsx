export default function opacity() {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-black/75 p-3 rounded-[1rem] bg-blur-md min-w-0 w-full max-w-md" >
                (For the text box)
                <div className="flex justify-center max-w-full w-full">
                    <span>0</span>
                    <input type="range" min="0" max="100" className="slider mx-2 py-0 w-full min-w-0"></input>
                    <span>100</span>
                </div>
            </div>
        </div>
    )
}