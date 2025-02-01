import "./AvailabilityCell.css";

type Props = {
  availability: string;
};

function AvailabilityRegisterCell(props: Props) {
  return (
    <div className="availability-register-cell">
      <p>{props.availability}</p>
    </div>
  );
}

export default AvailabilityRegisterCell;
