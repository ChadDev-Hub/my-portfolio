"use client";
import { SendEmail } from "@/lib/api/resend";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Email } from "@/lib/types/email";
const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Email>();
  const onSubmit: SubmitHandler<Email> = async (data) => {
    const res = await SendEmail(data);
    console.log(res);
    reset();
  };
  return (
    <section
      id="contact"
      className="flex items-start justify-center carousel-item w-full "
    >
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 w-full max-w-6xl py-26 px-4">
        {/* Header */}
        <div className="lg:col-span-1">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              <span className="text-primary">Contact</span>
              <br />
              <span className="text-secondary">Me</span>
            </h1>
            <p className="mt-4 text-base-content/80 max-w-xl text-lg">
              Have a project in mind, a question, or just want to say hi? Feel
              free to reach out using the form or through any of the channels
              below.
            </p>
          </div>

          <div className="card bg-base-200 border border-base-300 lg:col-span-1 space-y-6 lg:order-2 hover:shadow-xl">
            <div className="card-body gap-6">
              <h2 className="card-title text-2xl font-bold text-base-content">
                Get in Touch
              </h2>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Email</p>
                  <a
                    href="mailto:richardrojo61@gmail.com"
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    richardrojo61@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Location</p>
                  <p className="font-semibold">
                    Coron Palawan, Philippines 5316
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t border-base-300">
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                  </span>
                  Available for new projects & freelance work
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-1 col-start-1 ">
          <div className="card bg-base-200 hover:shadow-xl border border-base-300">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 "
            >
              {/* Name Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <input
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                  placeholder="Johny Does"
                  className="input input-bordered w-full focus:input-primary"
                />
                {errors.name && (
                  <span className="text-error">{errors.name.message}</span>
                )}
              </div>

              {/* Email Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full focus:input-primary"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
                {errors.email && (
                  <span className="text-error">{errors.email.message}</span>
                )}
              </div>

              {/* Subject Input */}
              <div className="form-control w-full col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="input input-bordered w-full focus:input-primary"
                  {...register("subject", {
                    required: { value: true, message: "Subject is required" },
                  })}
                />
                {errors.subject && (
                  <span className="text-error">{errors.subject.message}</span>
                )}
              </div>

              {/* Message Input */}
              <div className="form-control w-full col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="textarea textarea-bordered w-full focus:textarea-primary text-base"
                  {...register("message", {
                    required: { value: true, message: "Message is required" },
                  })}
                ></textarea>
                {errors.message && (
                  <span className="text-error">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="card-actions justify-end pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto px-8"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
