import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import {addQuiz} from "@/Services/quizApi.js";
import {useNavigate} from "react-router-dom";

const AddQuiz = () => {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm(

    );
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test",
    });

    const navigate = useNavigate();
    function submit(data) {
        addQuiz(data).then(()=>{
            navigate("/dashboard/quiz");
        })
    }


    const index = 1;
    return (
        <div>
            <Card
                title="Add Quiz"
            >
                <form onSubmit={handleSubmit(submit)}>
                    <div
                        className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                        key={index}
                    >
                        <Textinput
                            label="Name"
                            type="text"
                            id={`name}`}
                            placeholder="Quiz's Name"
                            register={register}
                            name={`name`}
                        />
                        <Textinput
                            label="Subject"
                            type="text"
                            id={`subject`}
                            placeholder="Quiz's Subject"
                            register={register}
                            name={`subject`}
                        />
                    </div>



                    <div className="ltr:text-right rtl:text-left">
                        <Button type="Submit" text="Submit" className="btn-dark"/>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddQuiz;
