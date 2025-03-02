import {Alert, Button, ListItem, OrderedList, UnorderedList, Pane, Paragraph, Text, Strong, CaretDownIcon, UploadIcon, EditIcon} from 'evergreen-ui'

import StatusBadge from '@/components/status-badge'
import Tuto from '@/components/help/tuto'
import Unauthorized from '@/components/help/tuto/unauthorized'
import Problems from '@/components/help/help-tabs/problems'
import {VideoContainer, PEERTUBE_LINK} from '@/components/help/video-container'

function Publication() {
  return (
    <Pane>
      <VideoContainer
        title='Publication de votre Base Adresse Locale :'
        link={`${PEERTUBE_LINK}/w/4uU6AHpTe7coPyhskBSANB`}
      />
      <Tuto title='Obtenir une habilitation'>
        <Paragraph>
          Avant de pouvoir publier vos adresses, votre Base Adresses Locale doit être habilitée.
        </Paragraph>

        <OrderedList margin={8}>
          <ListItem>
            <Paragraph>
              Cliquez sur le bouton
              <Button marginX={4} height={24} appearance='primary'>
                Publier
              </Button>
            </Paragraph>
          </ListItem>

          <ListItem>
            Vous serez alors invité à choisir un mode d’authentification.
            <UnorderedList margin={8}>
              <ListItem>Comme élu avec FranceConnect</ListItem>
              <ListItem>Comme mairie avec l’envoi d’un code par email</ListItem>
            </UnorderedList>
          </ListItem>

          <ListItem>
            Une fois votre authentification confirmée, votre Base Adresse Locale obtiendra une habilitation valable 6 mois.
          </ListItem>
        </OrderedList>
      </Tuto>

      <Tuto title='Publier sa Base Adresse Locale'>
        <OrderedList margin={8}>
          <Strong>Si votre Base Adresses Locale n’est pas encore habilitée</Strong>
          <ListItem>
            Obtenir une habilitation (voir section précédente).
          </ListItem>

          <ListItem>
            Une fois l’habilitation obtenue, vous serez automatiquement invité à publier votre Base Adresse Locale en cliquant sur
            <Button marginX={4} height={24} appearance='primary' intent='success'>
              Publier
            </Button>
          </ListItem>
        </OrderedList>

        <OrderedList margin={8}>
          <Strong>Si votre Base Adresses Locale est habilitée</Strong>
          <ListItem>
            Cliquez sur le bouton
            <Button
              height={24}
              marginX={4}
              appearance='primary'
              iconAfter={CaretDownIcon}
            >
              Publication
            </Button>
          </ListItem>

          <ListItem>
            <Paragraph>
              Cliquez sur
              <Button appearance='default' marginX={4} height={24} iconBefore={UploadIcon}>
                Publier
              </Button>
            </Paragraph>
          </ListItem>

          <ListItem>
            Une fenêtre de confirmation s’affichera, cliquez sur le bouton
            <Button marginX={4} height={24} appearance='primary' intent='success'>
              Publier
            </Button>
            pour publier vos adresses dans la Base Adresse Nationale.
          </ListItem>

          <Alert title='En cas de conflit'>
            <Text display='block' color='muted'>
              Il peut arriver qu’une autre Base Adresse Locale soit déjà synchronisée avec la Base Adresse Nationale. Dans ce cas, votre Base Adresse Locale va entrer en conflit avec celle-ci.
            </Text>
            <Text display='block' marginTop={8} color='muted'>
              En cliquant sur
              <Button appearance='primary' intent='danger' height={24} marginX={4}>
                Forcer la publication
              </Button>
              votre Base Adresse Locale sera publiée et remplacera celle actuellement en place.
            </Text>
          </Alert>
        </OrderedList>
      </Tuto>

      <Tuto title='Statuts de synchronisation'>
        <Pane display='flex' flexDirection='column' gap={16} marginTop={8}>
          <Pane display='grid' gridTemplateColumns='160px 1fr' gap={8}>
            <Pane height={32} marginTop={4}>
              <StatusBadge status='published' sync={{isPaused: false, status: 'synced'}} />
            </Pane>
            <Text>
              Votre Base Adresse Locale est à jour avec la Base Adresse Nationale. Toutes ses adresses sont prises en compte.
            </Text>
          </Pane>

          <Pane display='grid' gridTemplateColumns='160px 1fr' gap={8}>
            <Pane height={38}>
              <StatusBadge status='published' sync={{isPaused: false, status: 'outdated'}} />
            </Pane>
            <Text>
              Des modifications ont été détectées, la Base Adresse Nationale sera automatiquement mise à jour d’ici quelques heures.
            </Text>
          </Pane>

          <Pane display='grid' gridTemplateColumns='160px 1fr' gap={8}>
            <Pane height={32} marginTop={4}>
              <StatusBadge status='published' sync={{isPaused: true, status: 'synced'}} />
            </Pane>
            <Text>
              Vous avez suspendus les mises à jour de votre Base Adresse Locale. Aucune modification ne sera transmise à la Base Adresse Nationale. Vous pouvez relancer les mises à jours à tout moment.
            </Text>
          </Pane>

          <Pane display='grid' gridTemplateColumns='160px 1fr' gap={8}>
            <Pane height={32} marginTop={4}>
              <StatusBadge status='replaced' sync={{isPaused: true, status: 'conflict'}} />
            </Pane>
            <Text>
              Une autre Base Adresse Locale a remplacé la votre, impossible de mettre à jour automatiquement vos adresses. Vous pouvez forcer la mise à jour afin de remplacer la Base Adresse Locale actuellement en place.
            </Text>
          </Pane>
        </Pane>
      </Tuto>

      <Tuto title='Bon à savoir'>
        <ListItem listStyleType='none'>
          En mode
          <Pane display='inline-flex' width={172} height={28} margin={4}>
            <StatusBadge status='ready-to-publish' />
          </Pane>
          il vous est possible de revenir au mode brouillon en cliquant sur
          <Button
            marginX={4}
            height={24}
            appearance='primary'
            iconAfter={CaretDownIcon}
          >
            Publication
          </Button>
          puis &nbsp;
          <Button appearance='default' height={24} iconBefore={EditIcon}>
            Revenir au brouillon
          </Button>
        </ListItem>
      </Tuto>

      <Problems>
        <Unauthorized title='Je n’arrive pas à éditer ma BAL' />
      </Problems>
    </Pane>
  )
}

export default Publication
