import { Modal } from "antd";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import "./modal.scss";

const JokeModal = ({ joke, loading, isOpen, cancel, onNext }) => {

    return (
        <div>
            <Modal
                open={isOpen}
                loading={loading}
                onOk={cancel}
                onCancel={cancel}
                footer={[
                    <button key="exit" type="button" className="modalButtons" onClick={cancel}>looks good</button>,
                    <button key="again" type="button" className="modalButtons" onClick={onNext}>another one!</button>,
                ]}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >
                <div className="joke-content">
                    <FormatQuoteIcon className="quote start-quote" />
                    <FormatQuoteIcon className="quote start-quote-shadow" />
                    <FormatQuoteIcon className="quote end-quote" />
                    <FormatQuoteIcon className="quote end-quote-shadow" />
                    {joke}
                </div>
            </Modal>
        </div>
    )
}

export default JokeModal;