type Props = {
  title: string;
};

export default function NewsCard({ title }: Props) {
  return <li className="text-sm text-gray-700 dark:text-gray-300">{title}</li>;
}
