import PromptCard from "./PromptCard";

interface ProfileProps {
  data?: Array<{ _id: string }>;
  name?: string;
  desc?: string;
  handleDelete?: (post: { _id: string }) => void;
  handleEdit?: (post: { _id: string }) => void;
}

const Profile = ({
  name,
  desc,
  data,
  handleDelete,
  handleEdit,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="mt-5 text-3xl font-bold leading-[1.15] text-black sm:text-5xl text-left">
        <span className="blue_gradient">{name}'s Profile</span>
      </h1>
      <p className="desc">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
