import ResultClient from "@/components/ResultClient";
// import { useRouter } from "next/router";

export default function page() {
    // const router = useRouter()
    return (
        <div className="grid grid-cols-flow grid-cols-2">
            <h2 className="col-span-2">Sorular</h2>
            <ResultClient />
        </div>
    )
}
