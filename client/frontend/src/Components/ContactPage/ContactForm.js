import { Col, Row, Form, Button } from "react-bootstrap"

const ContactForm = (props) =>{
    return(
        <Form onSubmit={props.submit}>
            <Row >
                <Form.Floating as={Col} className="mb-4">
                    <Form.Control
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        required
                    />
                    <label htmlFor="name" style={{ paddingLeft: '25px' }}>Name</label>
                </Form.Floating>
                <Form.Floating as={Col} className="mb-4">
                    <Form.Control
                        id="mobile"
                        type="number"
                        name="mobile"
                        placeholder="Enter Your Mobile Number"
                        required
                    />
                    <label htmlFor="mobile" style={{ paddingLeft: '25px' }}>Mobile</label>
                </Form.Floating>
            </Row>
    
            <Form.Floating as={Col} className="mb-4">
                <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                />
                <label htmlFor="email">Email</label>
            </Form.Floating>
    
            <Form.Floating as={Col} className="mb-4">
                <Form.Control
                    id="message"
                    as="textarea"
                    name="message"
                    style={{ height: '100px' }}
                    placeholder="Enter Your Message"
                />
                <label htmlFor="message">Message</label>
            </Form.Floating>
    
            <Button variant="primary" type="submit" size="lg" className="w-100">
                Send
            </Button>
        </Form>
    )
}

export default ContactForm