import { useState } from 'react';

const Card = ({ currentCardData, increaseStep, decreaseStep, step, length, moveTo }) => {
  const { title, description, bgColor, image } = currentCardData;
  const [animationClass, setAnimationClass] = useState('');

  const handleIncreaseStep = () => {
    setAnimationClass('slide-out-left');
    setTimeout(() => {
      increaseStep();

      setAnimationClass('slide-in-right');
    }, 500);
  };

  const handleDecreaseStep = () => {
    setAnimationClass('slide-out-right');
    setTimeout(() => {
      decreaseStep();
      setAnimationClass('slide-in-left');
    }, 500);
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < length; i++) {
      dots.push(
        <span
          key={i}
          onClick={() => handleMoveTo(i)}
          className={`cursor-pointer mx-1 inline-block transform transition-transform duration-300 ${i === step ? 'text-gray-800 scale-150 scale-x-[3.35]' : 'text-gray-400'}`}
        >
          •
        </span>
      );
    }
    return dots;
  };

  const handleMoveTo = (index) => {
    if (index > step) {
      setAnimationClass('slide-out-left');
      setTimeout(() => {
        moveTo(index);
        setAnimationClass('slide-in-right');
      }, 500);
    } else if (index < step) {
      setAnimationClass('slide-out-right');
      setTimeout(() => {
        moveTo(index);
        setAnimationClass('slide-in-left');
      }, 500);
    }
  };

  return (
    <div className={`h-[85vh] w-[85vw] md:w-[75vw] lg:w-[55vw] xl:w-[40vw] mx-auto shadow-2xl rounded-3xl overflow-hidden ${animationClass}`}>
      <div className={`h-2/3 ${bgColor} flex items-center justify-center`}>
        <img src={image} alt={title} className={`object-contain h-3/4 w-5/6`} />
      </div>
      <div className="h-1/3 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mt-2 md:mt-4">{title}</h2>
        <p className="text-center mt-2 px-8 h-1/3 text-sm md:text-base lg:text-lg">{description}</p>
        <div className="md:mx-16 flex justify-between items-center mt-5 md:mt-0 m-4 mb-0 px-8 lg:px-7 w-full">
          <div className="flex flex-grow">
            {renderDots()}
          </div>
          <div className="flex flex-shrink-0">
            {step > 0 && (
              <button onClick={handleDecreaseStep} className="m-2 mt-0 w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 flex items-center justify-center border text-gray-800 border-black rounded-full">
                &larr;
              </button>
            )}
            {step < length - 1 && (
              <button onClick={handleIncreaseStep} className="m-2 mt-0 w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 flex items-center justify-center bg-gray-800 text-white rounded-full">
                &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;