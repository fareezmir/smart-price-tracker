
import { Button } from "@/components/Button"


export default function Home() {
  return (
    <main className="bg-surfaceBlack text-textWhite min-h-screen">
      <div className="container py-16 space-x-4">
        <Button>Default</Button>
        <Button variant= "primary" >Sized pill</Button>
        <Button variant="neutral" className="px-5 py-3 rounded-full">Neutral</Button>
        <Button variant="link">Link</Button>
        <Button appearance="gradient" className="px-5 py-4 rounded-full text-base md:text-lg min-w-[200px] flex justify-center">
          Track Item
        </Button>
      </div>
    </main>
  );
}
