import WaitlistPage from "../components/Waitlist";

export const metadata = {
    title: "For Employers Gainday",
    description: "Join the Gainday employer waitlist. Hire from proof, not CVs receive a ranked shortlist of candidates who've demonstrated real capability.",
};

export default function EmployersPage() {
    return <WaitlistPage variant="employers" />;
}