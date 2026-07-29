import { invite } from "../../api/Group";


const EligibleMemberCard = ({ member, groupId, onInvite }) => {

    const handleInvite = async () => {
    try {
        const res = await invite({
    groupId,
    userId: member._id,
});

if (!res.success) {
    alert(res.message);
    return;
}

onInvite();
alert("Invitation sent!");
    } catch (error) {
        console.log(error);
        alert("Something went wrong.");
    }
};

    return (
        <div className="flex justify-between items-center p-3 border rounded-lg shadow-sm">

            <div>
                <h2 className="font-semibold">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.email}</p>
            </div>

            <button
                className="btn btn-primary btn-sm"
                onClick={handleInvite}
            >
                Invite
            </button>

        </div>
    );
};

export default EligibleMemberCard;