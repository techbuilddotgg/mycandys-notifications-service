interface Props {
  title: string;
  message: string;
}

export default function Mail({ title, message }: Props) {
  return (
    <div>
      {title},
      <br />
      {message}
    </div>
  );
}
