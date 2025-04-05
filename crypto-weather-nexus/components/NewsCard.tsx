type NewsCardProps = {
  title: string;
  link: string;
};

export default function NewsCard({ title, link }: NewsCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
    </a>
  );
}
