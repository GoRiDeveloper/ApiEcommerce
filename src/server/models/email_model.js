import { EmailDTO } from "../dtos/email_dto.js";

export class Email {

    #from;
    #to;
    #subject;
    #html;

    static createHTML (data) {

        const 
        
        H1   = `<h1 style="color: #fff;">${data.header}</h1>`,
        INFO = data.info.map(
            e => 
                `<p style="color: #6e7681; font-size: 15px">${"id: " + e.id} ${"qty: " + e.qty}</p><br/>`
        );
        
        return `
            <div style="background-color: #000;width: 700px;height: auto;">
                ${H1}
                ${INFO.join("")}
            </div>
        `;

    };

    constructor ({

        from,
        to,
        subject,
        html

    }) {

        this.#from    = from;
        this.#to      = to;
        this.#subject = subject;
        this.#html    = html;

    };

    asDto () {

        return new EmailDTO({

            from: this.#from,
            to: this.#to,
            subject: this.#subject,
            html: this.#html

        });

    };

};