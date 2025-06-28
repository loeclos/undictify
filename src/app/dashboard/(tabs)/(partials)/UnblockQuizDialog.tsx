import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import questions from './questions.json';

interface Option {
    text: string;
    isCorrect: boolean;
    indicatesNotDisable: boolean;
}

interface Question {
    type: 'multiple-choice' | 'fill-in-the-blank' | 'task';
    question: string;
    options?: Option[];
    correctAnswer?: string;
}

interface UnblockQuizDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDisable: () => void;
}

// Define types for the raw question and option objects from JSON
interface RawOption {
    text?: string;
    isCorrect?: boolean;
    indicatesNotDisable?: boolean;
}
type RawOptionType = string | RawOption;

interface RawQuestion {
    type: string;
    text: string;
    options?: RawOptionType[];
    answer?: string;
}

export default function UnblockQuizDialog({
    isOpen,
    onClose,
    onDisable,
}: UnblockQuizDialogProps) {
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Map questions from JSON to match the Question interface, keep order
            const mappedQuestions: Question[] = (
                questions as RawQuestion[]
            ).map((q) => ({
                type:
                    q.type === 'multiple-choice' ||
                    q.type === 'fill-in-the-blank' ||
                    q.type === 'task'
                        ? q.type
                        : 'multiple-choice',
                question: q.text,
                options: q.options
                    ? q.options.map((opt) =>
                          typeof opt === 'string'
                              ? {
                                    text: opt,
                                    isCorrect: opt === q.answer,
                                    indicatesNotDisable: false,
                                }
                              : {
                                    text: (opt as RawOption).text ?? '',
                                    isCorrect:
                                        (opt as RawOption).isCorrect ?? false,
                                    indicatesNotDisable:
                                        (opt as RawOption)
                                            .indicatesNotDisable ?? false,
                                }
                      )
                    : undefined,
                correctAnswer: q.answer,
            }));
            setQuizQuestions(mappedQuestions);
            setCurrentQuestionIndex(0);
            setUserAnswer('');
        }
    }, [isOpen]);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleOptionClick = (option: Option) => {
        const isAllNoQuestion =
            currentQuestion.type === 'multiple-choice' &&
            currentQuestion.options &&
            currentQuestion.options.every(
                (opt) => opt.text.toLowerCase() === 'no'
            );

        if (isAllNoQuestion) {
            // Accept any answer and advance
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                onDisable();
            }
        } else {
            // Original logic
            if (option.indicatesNotDisable) {
                onClose();
            } else if (option.isCorrect) {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    onDisable();
                }
            } else {
                toast.error(
                    `You have answered question ${
                        currentQuestionIndex + 1
                    } incorrectly. Try again another time.`
                );
                onClose();
            }
        }
    };

    const handleSubmitAnswer = () => {
        if (
            userAnswer.toLowerCase() ===
                currentQuestion.correctAnswer?.toLowerCase() ||
            currentQuestion.correctAnswer === 'any'
        ) {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setUserAnswer('');
            } else {
                onDisable();
            }
        } else {
            toast.error(
                `You have answered question ${
                    currentQuestionIndex + 1
                } incorrectly. Try again another time.`
            );
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-serif">
                <DialogHeader>
                    <DialogTitle className="text-center text-md font-sans">
                        --Answer all of the questions to unblock--
                    </DialogTitle>
                </DialogHeader>
                {currentQuestion && (
                    <div className="mt-4">
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-500 rounded mb-4 overflow-hidden">
                            <div
                                className="h-full bg-blue-700 transition-all duration-300"
                                style={{
                                    width: quizQuestions.length
                                        ? `${
                                              ((currentQuestionIndex + 1) /
                                                  quizQuestions.length) *
                                              100
                                          }%`
                                        : '0%',
                                }}
                            />
                        </div>
                        <p className="mb-2">{currentQuestion.question}</p>
                        {currentQuestion.type === 'multiple-choice' &&
                        currentQuestion.options ? (
                            <div className="space-y-2">
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="w-full"
                                            onClick={() =>
                                                handleOptionClick(option)
                                            }
                                        >
                                            {option.text}
                                        </Button>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Input
                                    value={userAnswer}
                                    onChange={(e) =>
                                        setUserAnswer(e.target.value)
                                    }
                                    placeholder="Type your answer here"
                                    className="w-full"
                                />
                                <Button
                                    onClick={handleSubmitAnswer}
                                    className="w-full"
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
