import { useEffect, useState } from "react";
import { eligibleMembers} from "../../api/Group";
import EligibleMemberCard from "./EligibleMemberCard";


const InviteModal = ({ open, setOpen, group }) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {

        if (!group || !open) return;

        const fetchMembers = async () => {
            const data = await eligibleMembers(group._id);
            setMembers(data.user || []);
        };

        fetchMembers();

    }, [group, open]);

    if (!open) return null;

    return (
       <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center">

            <div className="bg-base-100 rounded-xl p-5 w-96">

                <div className="flex justify-between">

                    <h2 className="text-xl font-bold">
                        Invite Members
                    </h2>

                    <button onClick={() => setOpen(false)}>
                        ✕
                    </button>

                </div>

                <div className="mt-4 space-y-2">

                        {members.map(member => (
    <EligibleMemberCard
        key={member._id}
        member={member}
        groupId={group._id}
        onInvite={() =>
            setMembers(prev =>
                prev.filter(m => m._id !== member._id)
            )
        }
    />
))}
                </div>

            </div>

        </div>
    );
};

export default InviteModal;