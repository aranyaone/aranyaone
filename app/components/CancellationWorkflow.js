"use client";
import { useState } from "react";

export default function CancellationWorkflow({ service, onCancel, onBack }) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const cancellationReasons = [
    "Too expensive",
    "Not using it enough",
    "Found a better alternative",
    "Technical issues",
    "Poor customer service",
    "Don't need it anymore",
    "Temporary pause",
    "Other"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleConfirmCancellation = () => {
    // Here you would integrate with your backend to cancel the service
    console.log("Cancelling service:", service, { reason, feedback });
    onCancel();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Cancel {service?.name}
        </h3>
        <p className="text-gray-600">
          We're sorry to see you go. Let's make sure this is the right decision.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">What happens when you cancel:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• You'll lose access to {service?.name} features immediately</li>
          <li>• Your data will be preserved for 30 days</li>
          <li>• You can reactivate anytime within 30 days</li>
          <li>• No refunds for partial billing periods</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Before you cancel, consider:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Pausing your service instead (save money, keep data)</li>
          <li>• Downgrading to a cheaper plan</li>
          <li>• Contacting support for help with issues</li>
        </ul>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">🤔</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Help us improve
        </h3>
        <p className="text-gray-600">
          Your feedback helps us make Bujji Chat better for everyone.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Why are you cancelling? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cancellationReasons.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`p-3 text-left rounded-lg border-2 transition-all ${
                reason === r
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional feedback (optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
          rows={4}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">🎁</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Last chance to stay
        </h3>
        <p className="text-gray-600">
          We'd love to keep you as a customer. Here are some options:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <div className="text-2xl mb-2">⏸️</div>
          <h4 className="font-semibold text-green-800 mb-2">Pause Service</h4>
          <p className="text-sm text-green-700 mb-3">Keep your data, pay 50% less</p>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
            Pause Instead
          </button>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <div className="text-2xl mb-2">💰</div>
          <h4 className="font-semibold text-blue-800 mb-2">Get 50% Off</h4>
          <p className="text-sm text-blue-700 mb-3">Stay for 3 months at half price</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
            Get Discount
          </button>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
          <div className="text-2xl mb-2">📞</div>
          <h4 className="font-semibold text-purple-800 mb-2">Talk to Us</h4>
          <p className="text-sm text-purple-700 mb-3">Let's find a solution together</p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Or if you're sure you want to cancel, click below:
        </p>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Yes, Cancel My Service
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">❌</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Final Confirmation
        </h3>
        <p className="text-gray-600">
          Are you absolutely sure you want to cancel {service?.name}?
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-2">⚠️ This action cannot be undone immediately</h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Your service will be cancelled immediately</li>
          <li>• You'll lose access to all features</li>
          <li>• Your data will be preserved for 30 days</li>
          <li>• You can reactivate within 30 days</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Cancellation Summary:</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div><strong>Service:</strong> {service?.name}</div>
          <div><strong>Reason:</strong> {reason}</div>
          {feedback && <div><strong>Feedback:</strong> {feedback}</div>}
          <div><strong>Effective Date:</strong> Immediately</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
          <span className="text-sm text-gray-500">
            {step === 1 && "Review"}
            {step === 2 && "Feedback"}
            {step === 3 && "Final"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {!showConfirmation ? (
        <>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </>
      ) : (
        renderConfirmation()
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={handleBack}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          {step === 1 ? "Back" : "Previous"}
        </button>
        
        {!showConfirmation ? (
          <button
            onClick={handleNext}
            disabled={step === 2 && !reason}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {step === 3 ? "Cancel Service" : "Next"}
          </button>
        ) : (
          <div className="flex gap-3 flex-1">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleConfirmCancellation}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Yes, Cancel Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 