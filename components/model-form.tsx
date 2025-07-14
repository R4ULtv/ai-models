"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BrainIcon,
  CpuIcon,
  DownloadIcon,
  EyeIcon,
  FileTextIcon,
  ImageIcon,
  TypeIcon,
  VideoIcon,
  Volume2Icon,
  WrenchIcon,
  SquareFunctionIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ThermometerIcon,
  PaperclipIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Model, modelSchema } from "@/lib/schema";
import CapabilityCheckbox from "@/components/form/capabilities-checkbox";
import ModalityCheckbox from "@/components/form/modalities-checkbox";
import OptionsSwitch from "@/components/form/options-switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ModelForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const form = useForm<Model>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      id: "",
      name: "",
      provider_id: "",
      provider: "",
      capabilities: [],
      modalities: {
        input: [],
        output: ["text"],
      },
      limit: {
        context: 0,
        output: 0,
      },
      temperature: false,
      attachment: false,
    },
  });

  const onSubmit = (values: Model) => {
    if (step !== totalSteps) {
      return;
    }

    const jsonData = JSON.stringify(values, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${values.id}.json`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="h-8">
          New Model
          <kbd className="bg-muted/20 text-secondary ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            C
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-5 [&>button:last-child]:right-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.error(error);
            })}
          >
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b px-6 py-4 text-base">
                New Model{" "}
                <span className="ml-2 text-muted-foreground text-xs">
                  {step}/{totalSteps}
                </span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only">
              Create a new AI model and configure its settings. Download the
              model in JSON format.
            </DialogDescription>

            <div className="p-6 space-y-4">
              {/* IDs and Names */}
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Model ID *</FormLabel>
                        <FormDescription>
                          This ID is used to reference the model throughout the
                          AI SDK.
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="gpt-4o" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Model Name *</FormLabel>
                        <FormDescription>
                          This name is used to reference the model throughout
                          the AI SDK.
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="GPT 4o" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provider_id"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Provider ID *</FormLabel>
                        <FormDescription>
                          This ID is used to reference the provider throughout
                          the AI SDK.
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="openai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Provider Name *</FormLabel>
                        <FormDescription>
                          This name is used to reference the provider throughout
                          the AI SDK.
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="OpenAI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Modalities */}
              {step === 2 && (
                <>
                  <fieldset className="space-y-2">
                    <legend className="text-foreground text-sm leading-none font-medium">
                      Input Modalities
                    </legend>
                    <p
                      data-slot="form-description"
                      className="text-muted-foreground text-sm"
                    >
                      This will determine what types of input the model can
                      process.
                    </p>
                    <div className="flex items-center gap-1.5">
                      <FormField
                        control={form.control}
                        name="modalities.input"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<TypeIcon className="size-4" />
                            modality="text"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.input"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<Volume2Icon className="size-4" />
                            modality="audio"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.input"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<ImageIcon className="size-4" />
                            modality="image"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.input"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<VideoIcon className="size-4" />
                            modality="video"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.input"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<FileTextIcon className="size-4" />
                            modality="pdf"
                          />
                        )}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2">
                    <legend className="text-foreground text-sm leading-none font-medium">
                      Output Modalities
                    </legend>
                    <p
                      data-slot="form-description"
                      className="text-muted-foreground text-sm"
                    >
                      This will determine what types of output the model can
                      generate.
                    </p>
                    <div className="flex items-center gap-1.5">
                      <FormField
                        control={form.control}
                        name="modalities.output"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<TypeIcon className="size-4" />
                            modality="text"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.output"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<Volume2Icon className="size-4" />
                            modality="audio"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.output"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<ImageIcon className="size-4" />
                            modality="image"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.output"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<VideoIcon className="size-4" />
                            modality="video"
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modalities.output"
                        render={({ field }) => (
                          <ModalityCheckbox
                            field={field}
                            icon=<FileTextIcon className="size-4" />
                            modality="pdf"
                            disabled
                          />
                        )}
                      />
                    </div>
                  </fieldset>
                </>
              )}

              {/* Capability */}
              {step === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => (
                      <CapabilityCheckbox
                        field={field}
                        icon=<WrenchIcon className="size-4" />
                        capability="tools"
                        title="Tools"
                        description="Enables the model to use external tools like search
                  engines or calculators."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => (
                      <CapabilityCheckbox
                        field={field}
                        icon=<EyeIcon className="size-4" />
                        capability="vision"
                        title="Vision"
                        description="Enables the model to process and understand image or video
                      inputs."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => (
                      <CapabilityCheckbox
                        field={field}
                        icon=<BrainIcon className="size-4" />
                        capability="reasoning"
                        title="Reasoning"
                        description="Enables the model to perform complex reasoning tasks, such
                    as problem-solving and logical deduction."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => (
                      <CapabilityCheckbox
                        field={field}
                        icon=<SquareFunctionIcon className="size-4" />
                        capability="embedding"
                        title="Embedding"
                        description="Enables the model to convert text into numerical
                    representations for tasks like search and clustering."
                      />
                    )}
                  />
                </>
              )}

              {/* Limits */}
              {step === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="limit.context"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Context Limit *</FormLabel>
                        <FormDescription>
                          Max number of tokens the model can process in a single
                          request.
                        </FormDescription>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="ps-9 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <CpuIcon size={16} aria-hidden="true" />
                          </div>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            TOKENS
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="limit.output"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Output Limit *</FormLabel>
                        <FormDescription>
                          Max number of tokens the model can generate in a
                          single response.
                        </FormDescription>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="ps-9 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <CpuIcon size={16} aria-hidden="true" />
                          </div>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            TOKENS
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Costs */}
              {step === 5 && (
                <>
                  <FormField
                    control={form.control}
                    name="cost.input"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Input Cost{" "}
                          <span className="text-[10px] text-muted-foreground">
                            PER 1M TOKENS
                          </span>
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className=" ps-6 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0.00"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                                )
                              }
                            />
                          </FormControl>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm -disabled:opacity-50">
                            $
                          </span>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            USD
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cost.output"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Output Cost{" "}
                          <span className="text-[10px] text-muted-foreground">
                            PER 1M TOKENS
                          </span>
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className=" ps-6 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0.00"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                                )
                              }
                            />
                          </FormControl>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm -disabled:opacity-50">
                            $
                          </span>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            USD
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cost.cache_read"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Cache Read Cost{" "}
                          <span className="text-[10px] text-muted-foreground">
                            PER 1M TOKENS
                          </span>
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className=" ps-6 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0.00"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                                )
                              }
                            />
                          </FormControl>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm -disabled:opacity-50">
                            $
                          </span>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            USD
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cost.cache_write"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Cache Write Cost{" "}
                          <span className="text-[10px] text-muted-foreground">
                            PER 1M TOKENS
                          </span>
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="ps-6 pe-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0.00"
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                                )
                              }
                            />
                          </FormControl>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm -disabled:opacity-50">
                            $
                          </span>
                          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs -disabled:opacity-50">
                            USD
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {step === 6 && (
                <>
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <OptionsSwitch
                        field={field}
                        icon=<ThermometerIcon className="size-4" />
                        title="Temperature"
                        description="Controls the randomness of the generated text. Higher values lead to more diverse outputs."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field }) => (
                      <OptionsSwitch
                        field={field}
                        icon={<PaperclipIcon className="size-4" />}
                        title="Attachment"
                        description="Controls the attachment of the generated text. Higher values lead to more diverse outputs."
                      />
                    )}
                  />
                </>
              )}
            </div>
            <DialogFooter className="border-t px-6 py-4">
              {step > 1 ? (
                <Button
                  className="group"
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  <ArrowLeftIcon
                    className="opacity-60 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                  Back
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              )}
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="submit">
                  <DownloadIcon
                    className="-ms-1"
                    size={16}
                    aria-hidden="true"
                  />
                  Download
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
