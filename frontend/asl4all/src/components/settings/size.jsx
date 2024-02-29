export default function size() {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-black/75 p-3 rounded-[0.7rem] bg-blur-md min-w-0 w-full max-w-md" >
                <div className="flex justify-center max-w-full w-full">
                    <span>12</span>
                    <input type="range" min="12" max="32" className="slider mx-2 py-0 w-full min-w-0"></input>
                    <span>32</span>
                </div>
            </div>
        </div>
    )
}