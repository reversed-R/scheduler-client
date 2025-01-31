import "./AvailabilityCell.css";

type Props = {
  availability: string;
};

function AvailabilityCell(props: Props) {
  return (
    <div className="availability-cell">
      <p>{props.availability}</p>
    </div>
  );
}

export default AvailabilityCell;
