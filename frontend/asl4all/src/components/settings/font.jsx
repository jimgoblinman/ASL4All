import styles from "./font.module.css";
export default function font() {
    return (
        <form className={styles.select}>
            <select name="fonts" id="fonts" className="text-white bg-[#] rounded-[0.7rem]">
                <option value="arial" className="font-arial">Arial</option>
                <option value="calibri" className="font-calibri">Calibri</option>
                <option value="gill-sans-mt" className="font-gill-sans-mt">Gill Sans MT</option>
                <option value="comic-sans" className="font-comic-sans">Comic Sans</option>
            </select>
        </form>
    )
}