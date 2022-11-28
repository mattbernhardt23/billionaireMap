

export default function Stats() {
    return (
        <>
            <div className="bg-red-500 rounded-md text-white m-2 p-2">
                {/* Okay, what we want to do here is  */}
                <div className="flex flex-row justify-between">
                    <p>Total Billionaires</p>
                    <p>2,648</p>
                </div>
                <div  className="flex flex-row justify-between">
                    <p>Amount of Capital Owned</p>
                    <p>$14.768 Trillion</p>
                </div>
                <div  className="flex flex-row justify-between">
                    <p>Percent of That Country's Wealth</p>
                    <p>35.43%</p>
                </div>
            </div>
        </>
    )
}