import WaitlistPage from "../components/Waitlist";

export const metadata = {
    title: "For Candidates Gainday",
    description: "Join the Gainday candidate waitlist. Show employers what you can actually do through role-based challenges.",
};

export default function CandidatesPage() {
    return <WaitlistPage variant="candidates" />;
}