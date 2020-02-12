import React, { useEffect, useState } from 'react'

import DrugDetailsPage from './drug-details-page'

import { getDrugProductLabeling } from '../../../../services/openfda'

const DrugDetails = ({ state }) => {
   const { open, rxcui, setOpen } = state
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
      const normalizeDetail = raw => {
         let normalized = {
            disclaimer: raw.meta.disclaimer,
            lastUpdated: raw.meta.last_updated,
            effectiveDate: raw.results[0].effective_time,
            drugInteractions: raw.results[0].drug_interactions
               ? raw.results[0].drug_interactions[0]
               : '',
            geriatricUse: raw.results[0].geriatric_use
               ? raw.results[0].geriatric_use[0]
               : '',
            abuse: raw.results[0].abuse ? raw.results[0].abuse[0] : '',
            pharmacodynamics: raw.results[0].pharmacodynamics
               ? raw.results[0].pharmacodynamics[0]
               : '',
            description: raw.results[0].description
               ? raw.results[0].description[0]
               : '',
            nonclinicalToxicology: raw.results[0].nonclinical_toxicology
               ? raw.results[0].nonclinical_toxicology[0]
               : '',
            warningsAndCautions: raw.results[0].warnings_and_cautions
               ? raw.results[0].warnings_and_cautions[0]
               : '',
            dosageFormsAndStrengths: raw.results[0].dosage_forms_and_strengths
               ? raw.results[0].dosage_forms_and_strengths[0]
               : '',
            storageAndHandling: raw.results[0].storage_and_handling
               ? raw.results[0].storage_and_handling[0]
               : '',
            mechanismOfAction: raw.results[0].mechanism_of_action
               ? raw.results[0].mechanism_of_action[0]
               : '',
            pharmacokinetics: raw.results[0].pharmacokinetics
               ? raw.results[0].pharmacokinetics[0]
               : '',
            indicationsAndUsage: raw.results[0].indications_and_usage
               ? raw.results[0].indications_and_usage[0]
               : '',
            dosageAndAdministration: raw.results[0].dosage_and_administration
               ? raw.results[0].dosage_and_administration[0]
               : '',
            pediatricUse: raw.results[0].pediatric_use
               ? raw.results[0].pediatric_use[0]
               : '',
            contraindications: raw.results[0].contraindications
               ? raw.results[0].contraindications[0]
               : '',
            drugAbuseAndDependence: raw.results[0].drug_abuse_and_dependence
               ? raw.results[0].drug_abuse_and_dependence[0]
               : '',
            pregnancy: raw.results[0].pregnancy
               ? raw.results[0].pregnancy[0]
               : '',
            genericName: raw.results[0].openfda.generic_name
               ? raw.results[0].openfda.generic_name[0]
               : '',
            brandName: raw.results[0].openfda.brand_name
               ? raw.results[0].openfda.brand_name[0]
               : '',
            manufacturerName: raw.results[0].openfda.manufacturer_name
               ? raw.results[0].openfda.manufacturer_name[0]
               : '',
            controlledSubstance: raw.results[0].controlled_substance
               ? raw.results[0].controlled_substance[0]
               : '',
            adverseReactions: raw.results[0].adverse_reactions
               ? raw.results[0].adverse_reactions[0]
               : '',
            useInSpecificPopulations: raw.results[0].use_in_specific_populations
               ? raw.results[0].use_in_specific_populations[0]
               : '',
            howSupplied: raw.results[0].how_supplied
               ? raw.results[0].how_supplied[0]
               : '',
            informationForPatients: raw.results[0].information_for_patients
               ? raw.results[0].information_for_patients[0]
               : '',
            clinicalStudies: raw.results[0].clinical_studies
               ? raw.results[0].clinical_studies[0]
               : '',
            clinicalPharmacology: raw.results[0].clinical_pharmacology
               ? raw.results[0].clinical_pharmacology[0]
               : '',
            carcinogenisisAndMutagenisisAndImpairmentOfFertility: raw.results[0]
               .carcinogenesis_and_mutagenesis_and_impairment_of_fertility
               ? raw.results[0]
                    .carcinogenesis_and_mutagenesis_and_impairment_of_fertility[0]
               : '',
            overdosage: raw.results[0].overdosage
               ? raw.results[0].overdosage[0]
               : '',
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

         return normalizeDetail(result)
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
