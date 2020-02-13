import React, { useEffect, useState } from 'react'

import DrugDetailsPage from './drug-details-page'

import { getDrugProductLabeling } from '../../../../services/openfda'
import constants from '../../../../constants'

const DrugDetails = ({ state }) => {
   const { open, rxcui, setOpen } = state
   const { images } = constants
   const { baseUrl } = constants.services.aws.s3
   const [detail, setDetail] = useState({})
   useEffect(() => {
      if (!rxcui) {
         setDetail({})
         return
      }

      const getDrugDetails = async () => {
         let result = await handleGetDrugDetail()
         if (result && result.disclaimer) {
            setDetail(result)
            setOpen(true)
         }
      }

      getDrugDetails()
   }, [rxcui])

   const handleGetDrugDetail = async () => {
      const normalizeDetail = (raw, rxcui) => {
         let normalized = {
            rxcui: {
               type: 'meta',
               label: 'RxCUI',
               value: rxcui,
            },
            brandName: {
               type: 'meta',
               label: 'Brand Name',
               value: raw.results[0].openfda.brand_name
                  ? raw.results[0].openfda.brand_name[0]
                  : '',
            },
            genericName: {
               type: 'meta',
               label: 'Generic Name',
               value: raw.results[0].openfda.generic_name
                  ? raw.results[0].openfda.generic_name[0]
                  : '',
            },
            manufacturerName: {
               type: 'meta',
               label: 'Manufacturer',
               value: raw.results[0].openfda.manufacturer_name
                  ? raw.results[0].openfda.manufacturer_name[0]
                  : '',
            },
            lastUpdated: {
               type: 'meta',
               label: 'Last Updated',
               value: raw.meta.last_updated,
            },
            effectiveDate: {
               type: 'meta',
               label: 'Effective Date',
               value: raw.results[0].effective_time,
            },
            storageAndHandling: {
               type: 'meta',
               label: 'Storage and Handling',
               value: raw.results[0].storage_and_handling
                  ? raw.results[0].storage_and_handling[0]
                  : '',
            },
            indicationsAndUsage: {
               label: '1 Indications and Usage',
               value: raw.results[0].indications_and_usage
                  ? raw.results[0].indications_and_usage[0]
                  : '',
            },
            dosageAndAdministration: {
               label: '2 Dosage and Administration',
               value: raw.results[0].dosage_and_administration
                  ? raw.results[0].dosage_and_administration[0]
                  : '',
            },
            dosageFormsAndStrengths: {
               label: '3 Dosage Forms and Strengths',
               value: raw.results[0].dosage_forms_and_strengths
                  ? raw.results[0].dosage_forms_and_strengths[0]
                  : '',
            },
            contraindications: {
               label: '4 Contraindications',
               value: raw.results[0].contraindications
                  ? raw.results[0].contraindications[0]
                  : '',
            },
            warningsAndCautions: {
               label: '5 Warnings and Cautions',
               value: raw.results[0].warnings_and_cautions
                  ? raw.results[0].warnings_and_cautions[0]
                  : '',
            },
            adverseReactions: {
               label: '6 Adverse Reactions',
               value: raw.results[0].adverse_reactions
                  ? raw.results[0].adverse_reactions[0]
                  : '',
            },
            drugInteractions: {
               label: '7 Drug Interactions',
               value: raw.results[0].drug_interactions
                  ? raw.results[0].drug_interactions[0]
                  : '',
            },
            useInSpecificPopulations: {
               label: '8 Use in Specific Populations',
               value: raw.results[0].use_in_specific_populations
                  ? raw.results[0].use_in_specific_populations[0]
                  : '',
            },
            pregnancy: {
               label: '8.1 Pregnancy',
               value: raw.results[0].pregnancy
                  ? raw.results[0].pregnancy[0]
                  : '',
            },
            pediatricUse: {
               label: '8.4 Pediatric Use',
               value: raw.results[0].pediatric_use
                  ? raw.results[0].pediatric_use[0]
                  : '',
            },
            geriatricUse: {
               label: '8.5 Geriatric Use',
               value: raw.results[0].geriatric_use
                  ? raw.results[0].geriatric_use[0]
                  : '',
            },
            drugAbuseAndDependence: {
               label: '9 Drug Abuse and Dependence',
               value: raw.results[0].drug_abuse_and_dependence
                  ? raw.results[0].drug_abuse_and_dependence[0]
                  : '',
            },
            controlledSubstance: {
               label: '9.1 Controlled Substance',
               value: raw.results[0].controlled_substance
                  ? raw.results[0].controlled_substance[0]
                  : '',
            },
            abuse: {
               label: '9.2 Abuse',
               value: raw.results[0].abuse ? raw.results[0].abuse[0] : '',
            },
            overdosage: {
               label: '10 Overdosage',
               value: raw.results[0].overdosage
                  ? raw.results[0].overdosage[0]
                  : '',
            },
            description: {
               label: '11 Description',
               value: raw.results[0].description
                  ? raw.results[0].description[0]
                  : '',
            },
            clinicalPharmacology: {
               label: '12 Clinical Phamacology',
               value: raw.results[0].clinical_pharmacology
                  ? raw.results[0].clinical_pharmacology[0]
                  : '',
            },
            mechanismOfAction: {
               label: '12.1 Mechanism of Action',
               value: raw.results[0].mechanism_of_action
                  ? raw.results[0].mechanism_of_action[0]
                  : '',
            },
            pharmacodynamics: {
               label: '12.2 Pharmacodynamics',
               value: raw.results[0].pharmacodynamics
                  ? raw.results[0].pharmacodynamics[0]
                  : '',
            },
            pharmacokinetics: {
               label: '12.3 Pharmacokinetics',
               value: raw.results[0].pharmacokinetics
                  ? raw.results[0].pharmacokinetics[0]
                  : '',
            },
            nonclinicalToxicology: {
               label: '13 Non-clinical Toxicology',
               value: raw.results[0].nonclinical_toxicology
                  ? raw.results[0].nonclinical_toxicology[0]
                  : '',
            },
            carcinogenisisAndMutagenisisAndImpairmentOfFertility: {
               label:
                  '13.1 Carcinogenisis and Mutagenisis and Impairment of Fertility',
               value: raw.results[0]
                  .carcinogenesis_and_mutagenesis_and_impairment_of_fertility
                  ? raw.results[0]
                       .carcinogenesis_and_mutagenesis_and_impairment_of_fertility[0]
                  : '',
            },
            clinicalStudies: {
               label: '14 Clinical Studies',
               value: raw.results[0].clinical_studies
                  ? raw.results[0].clinical_studies[0]
                  : '',
            },
            howSupplied: {
               label: '16 How Supplied',
               value: raw.results[0].how_supplied
                  ? raw.results[0].how_supplied[0]
                  : '',
            },
            informationForPatients: {
               label: '17 Information for Patients',
               value: raw.results[0].information_for_patients
                  ? raw.results[0].information_for_patients[0]
                  : '',
            },
            disclaimer: {
               label: 'Disclaimer',
               value: raw.meta.disclaimer,
            },
            image: {
               type: 'image',
               label: '',
               value: images[rxcui] ? baseUrl + images[rxcui]._600 : false,
            },
         }
         return normalized
      }

      const callGetDrugDetail = async () => {
         let result = await getDrugProductLabeling(rxcui)

         if (result.error) {
            alert(
               "This drug wasn't found in the FDA database.  This is likely because it either isn't a prescription drug or it is too new to show up in their database."
            )
            return {}
         }

         return normalizeDetail(result, rxcui)
      }

      return await callGetDrugDetail()
   }

   const handleClose = () => {
      setOpen(false)
   }

   const propsDrugDetailsPage = {
      state: {
         detail,
         open,
         handleClose,
      },
   }

   return <DrugDetailsPage {...propsDrugDetailsPage} />
}

export default DrugDetails
